import axios from 'axios';

// Substitua pelos valores reais do seu projeto Supabase:
const SUPABASE_URL = 'https://nddazqssbociyzyqdwec.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZGF6cXNzYm9jaXl6eXFkd2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzgwMjgsImV4cCI6MjA2MzUxNDAyOH0.rsKMYec1naDM9IMO6-FBA7ohT_1AYv14jPaJzXYuy-8'; // Copie de Settings > API > Project API keys

const api = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1/`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  }
});

export default api;