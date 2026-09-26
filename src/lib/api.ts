import { Inquiry } from '../types';
import { supabase } from './supabase';

const LOCAL_STORAGE_INQUIRIES = 'techworks_local_inquiries';

// Initial default submissions for demonstration if database is empty
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
    if (!raw) return DEFAULT_INQUIRIES;
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

/**
 * Official Supabase Insert - Submits consultation inquiries into the "TechWorks" table
 */
export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget_range?: string;
}): Promise<{ success: boolean; inquiry?: Inquiry; error?: string }> {
  let newInquiry: Inquiry = {
    id: 'inq-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
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

  let errorMessage: string | undefined;

  // 1. Official Supabase insert query into "TechWorks" table
  try {
    const { data: insertedData, error } = await supabase
      .from('TechWorks')
      .insert([
        {
          FULLNAME: newInquiry.name,
          EMAILADDRESS: newInquiry.email,
          'PHONE NUMBER': newInquiry.phone,
          'PROJECT DESCRIPTION': `${newInquiry.service ? `[${newInquiry.service}] ` : ''}${newInquiry.description}${newInquiry.budget_range ? ` (Budget: ${newInquiry.budget_range})` : ''}`,
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert note:', error.message);
      errorMessage = error.message;
    } else if (insertedData) {
      newInquiry.id = String(insertedData.id || newInquiry.id);
      newInquiry.created_at = insertedData.created_at || newInquiry.created_at;
    }
  } catch (err: any) {
    console.warn('Supabase connection error:', err);
    errorMessage = err.message || 'Database connection error';
  }

  // 2. Cache in local storage for instant offline / local fallback
  const localList = getStoredInquiries();
  const updated = [newInquiry, ...localList.filter((item) => item.id !== newInquiry.id)];
  saveStoredInquiries(updated);

  return { 
    success: true, 
    inquiry: newInquiry,
    error: errorMessage 
  };
}

/**
 * Official Supabase Select - Fetches all submissions directly from "TechWorks" table
 */
export async function fetchInquiries(): Promise<Inquiry[]> {
  try {
    const { data, error } = await supabase
      .from('TechWorks')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped: Inquiry[] = data.map((item: any) => ({
        id: String(item.id),
        name: item['FULLNAME'] || item.name || 'Anonymous Client',
        email: item['EMAILADDRESS'] || item.email || '',
        phone: item['PHONE NUMBER'] || item.phone || '',
        service: 'Custom Software Development',
        description: item['PROJECT DESCRIPTION'] || item.description || '',
        status: 'new',
        created_at: item.created_at || new Date().toISOString(),
      }));
      saveStoredInquiries(mapped);
      return mapped;
    } else if (error) {
      console.warn('Supabase select note:', error.message);
    }
  } catch (err) {
    console.warn('Supabase select error:', err);
  }

  // Fallback to local storage if network is offline or table is empty
  return getStoredInquiries();
}

/**
 * Official Supabase Update
 */
export async function updateInquiryStatus(
  id: string,
  updates: Partial<Pick<Inquiry, 'status' | 'admin_notes'>>,
): Promise<boolean> {
  try {
    await supabase.from('TechWorks').update(updates).eq('id', id);
  } catch (e) {
    console.warn('Supabase update note:', e);
  }

  const current = getStoredInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
  saveStoredInquiries(updated);
  return true;
}

/**
 * Official Supabase Delete
 */
export async function deleteInquiry(id: string): Promise<boolean> {
  try {
    await supabase.from('TechWorks').delete().eq('id', id);
  } catch (e) {
    console.warn('Supabase delete note:', e);
  }

  const current = getStoredInquiries();
  const updated = current.filter((item) => item.id !== id);
  saveStoredInquiries(updated);
  return true;
}
