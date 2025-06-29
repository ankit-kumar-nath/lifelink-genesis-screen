
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xzhikfwmzzqlsgqygual.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6aGlrZndtenpxbHNncXlndWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMDA2OTYsImV4cCI6MjA2Njc3NjY5Nn0.CHks-jQHWuPMDScJa9zZI1e8hbX0APkhCgruv7XLNTk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
