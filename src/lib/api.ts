import { Inquiry } from '../types';
import { getSupabaseClient } from './supabase';

const LOCAL_STORAGE_INQUIRIES = 'techworks_local_inquiries';

// Initial default submissions so admin panel shows realistic demonstration if empty
const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    name: 'Sameer Verma',
    email: 'sameer.v@zenithlogistics.in',
    phone: '+91 98112 45890',
    service: 'Android App Development',
    description: 'Looking to build an Android logistics dispatch driver app with offline map routing, electronic signature capture, and UPI payment integration.',
    status: 'new',
    admin_notes: 'Priority lead. Sent WhatsApp introductory message.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    budget_range: '₹2,50,000 - ₹5,00,000',
  },
  {
    id: 'inq-102',
    name: 'Ananya Deshmukh',
    email: 'ananya@orthocare.clinic',
    phone: '+91 97234 11200',
    service: 'Custom Software Development',
    description: 'Need an online clinic OPD management and patient history portal similar to your dental clinic project.',
    status: 'contacted',
    admin_notes: 'Demo call scheduled for tomorrow 3 PM IST.',
    created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    budget_range: '₹1,50,000 - ₹3,00,000',
  },
  {
    id: 'inq-103',
    name: 'Karan Mehra',
    email: 'karan@growthfuel.co',
    phone: '+91 99551 88321',
    service: 'LLMs & Generative AI Systems',
    description: 'We want to integrate an autonomous customer support AI agent fine-tuned on our e-commerce product return policy.',
    status: 'in_progress',
    admin_notes: 'Sent proposal and architecture diagram.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    budget_range: '₹4,00,000+',
  },
];

function getStoredInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return DEFAULT_INQUIRIES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_INQUIRIES);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_INQUIRIES;
  }
}

function saveStoredInquiries(items: Inquiry[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_INQUIRIES, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }
}

export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget_range?: string;
}): Promise<{ success: boolean; inquiry?: Inquiry; error?: string }> {
  const supabase = getSupabaseClient();
  let newInquiry: Inquiry = {
    id: 'inq-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    service: data.service || 'Custom Software Development',
    description: data.description.trim(),
    status: 'new',
    admin_notes: '',
    budget_range: data.budget_range || 'Standard',
    created_at: new Date().toISOString(),
  };

  let supabaseSuccess = false;
  let supabaseErrorMessage = '';

  // 1. Direct insert to Supabase TechWorks table
  if (supabase) {
    try {
      // First attempt: insert into user's exact TechWorks table structure:
      // "FULLNAME", "EMAILADDRESS", "PHONE NUMBER", "PROJECT DESCRIPTION"
      const { data: supaData, error: techworksError } = await supabase
        .from('TechWorks')
        .insert([
          {
            FULLNAME: newInquiry.name,
            EMAILADDRESS: newInquiry.email,
            'PHONE NUMBER': newInquiry.phone,
            'PROJECT DESCRIPTION': `${newInquiry.service ? `[Service: ${newInquiry.service}] ` : ''}${newInquiry.description}`,
          },
        ])
        .select()
        .single();

      if (!techworksError && supaData) {
        supabaseSuccess = true;
        newInquiry = {
          ...newInquiry,
          id: String(supaData.id || newInquiry.id),
          created_at: supaData.created_at || newInquiry.created_at,
        };
      } else if (techworksError) {
        supabaseErrorMessage = techworksError.message;
        console.warn('TechWorks table insert error:', techworksError.message);
        
        // Fallback attempt: inquiries table in case user configured inquiries
        const { data: inqData, error: inqError } = await supabase
          .from('inquiries')
          .insert([
            {
              name: newInquiry.name,
              email: newInquiry.email,
              phone: newInquiry.phone,
              service: newInquiry.service,
              description: newInquiry.description,
              status: 'new',
            },
          ])
          .select()
          .single();

        if (!inqError && inqData) {
          supabaseSuccess = true;
          newInquiry = {
            ...newInquiry,
            id: String(inqData.id || newInquiry.id),
            created_at: inqData.created_at || newInquiry.created_at,
          };
        }
      }
    } catch (err: any) {
      supabaseErrorMessage = err.message || 'Supabase connection failed';
      console.warn('Supabase insertion error:', err);
    }
  } else {
    console.info('Supabase client not initialized: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are missing on Vercel or in local storage.');
  }

  // 2. Also try server API endpoint if on Node/local environment (ignore 404 on static Vercel)
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.inquiry) {
        newInquiry = json.inquiry;
      }
    }
  } catch (e) {
    // Normal on static Vercel deployments
  }

  // 3. Always update local storage
  const localList = getStoredInquiries();
  const updated = [newInquiry, ...localList.filter((item) => item.id !== newInquiry.id)];
  saveStoredInquiries(updated);

  return { 
    success: true, 
    inquiry: newInquiry,
    error: supabaseErrorMessage ? `Saved locally. Note from database: ${supabaseErrorMessage}` : undefined 
  };
}

export async function fetchInquiries(): Promise<Inquiry[]> {
  const supabase = getSupabaseClient();
  if (supabase) {
    // Check TechWorks table first
    try {
      const { data, error } = await supabase
        .from('TechWorks')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: Inquiry[] = data.map((item: any) => ({
          id: String(item.id),
          name: item['FULLNAME'] || item.name || 'Anonymous',
          email: item['EMAILADDRESS'] || item.email || '',
          phone: item['PHONE NUMBER'] || item.phone || '',
          service: 'Custom Software Development',
          description: item['PROJECT DESCRIPTION'] || item.description || '',
          status: 'new',
          created_at: item.created_at || new Date().toISOString(),
        }));
        saveStoredInquiries(mapped);
        return mapped;
      }
    } catch (err) {
      console.warn('TechWorks table query error:', err);
    }

    // Also check inquiries table
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        saveStoredInquiries(data);
        return data;
      }
    } catch (err) {
      console.warn('inquiries table query error:', err);
    }
  }

  // 2. Fetch from Express API (if server running)
  try {
    const res = await fetch('/api/inquiries');
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.inquiries) && json.inquiries.length > 0) {
        saveStoredInquiries(json.inquiries);
        return json.inquiries;
      }
    }
  } catch (e) {
    // Expected on static Vercel
  }

  // 3. Fallback to LocalStorage
  return getStoredInquiries();
}

export async function updateInquiryStatus(
  id: string,
  updates: Partial<Pick<Inquiry, 'status' | 'admin_notes'>>,
): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('inquiries').update(updates).eq('id', id);
    } catch (e) {
      // ignore
    }
  }

  try {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  } catch (e) {
    // ignore
  }

  const current = getStoredInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
  saveStoredInquiries(updated);
  return true;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from('TechWorks').delete().eq('id', id);
    } catch (e) {
      // ignore
    }
    try {
      await supabase.from('inquiries').delete().eq('id', id);
    } catch (e) {
      // ignore
    }
  }

  try {
    await fetch(`/api/inquiries/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    // ignore
  }

  const current = getStoredInquiries();
  const updated = current.filter((item) => item.id !== id);
  saveStoredInquiries(updated);
  return true;
}
