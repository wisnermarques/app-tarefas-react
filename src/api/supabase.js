// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nddazqssbociyzyqdwec.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZGF6cXNzYm9jaXl6eXFkd2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzgwMjgsImV4cCI6MjA2MzUxNDAyOH0.rsKMYec1naDM9IMO6-FBA7ohT_1AYv14jPaJzXYuy-8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;