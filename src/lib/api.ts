import { Inquiry } from '../types';
import { supabase } from './supabase';

const LOCAL_STORAGE_INQUIRIES = 'techworks_local_inquiries';

function getStoredInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_INQUIRIES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
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

  // Official Supabase insert query into "TechWorks" table
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
      console.error('Supabase insert error:', error.message);
      errorMessage = error.message;
    } else if (insertedData) {
      newInquiry.id = String(insertedData.id || newInquiry.id);
      newInquiry.created_at = insertedData.created_at || newInquiry.created_at;
    }
  } catch (err: any) {
    console.error('Supabase connection error:', err);
    errorMessage = err.message || 'Database connection error';
  }

  // Cache in local storage as well
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
export async function fetchInquiries(): Promise<{ inquiries: Inquiry[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('TechWorks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return { 
        inquiries: getStoredInquiries(), 
        error: error.message 
      };
    }

    if (Array.isArray(data)) {
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

      // Update local storage with fresh Supabase cloud records
      saveStoredInquiries(mapped);
      return { inquiries: mapped };
    }
  } catch (err: any) {
    console.error('Supabase query error:', err);
    return { 
      inquiries: getStoredInquiries(), 
      error: err.message || 'Network error fetching data' 
    };
  }

  return { inquiries: getStoredInquiries() };
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
