'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Database URL is not configured');
  }
  return neon(`${process.env.DATABASE_URL}`);
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.string(),
  date: z.string(),
});

const CreateInvoiceSchema = FormSchema.omit({ id: true, date: true });


export async function createInvoice(formData: FormData) {
  const validatedFields = CreateInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }
  
  const { amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  const sql = getSql();
  await sql`
   INSERT INTO invoices (customer_id, amount, status, date)
   VALUES (${validatedFields.data.customerId}, ${amountInCents}, ${validatedFields.data.status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  return { message: 'Invoice created successfully' };
}

export async function updateInvoice(id: string, formData: FormData) {
  const validatedFields = CreateInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }
  
  const { amount } = validatedFields.data;
  const amountInCents = amount * 100;

  const sql = getSql();
  await sql`
    UPDATE invoices
    SET customer_id = ${validatedFields.data.customerId}, 
        amount = ${amountInCents}, 
        status = ${validatedFields.data.status}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  return { message: 'Invoice updated successfully' };
}

