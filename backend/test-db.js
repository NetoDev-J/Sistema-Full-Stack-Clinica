// teste2.js
import 'dotenv/config'
import { supabase } from './src/database/supabase.js'

const { data, error } = await supabase
  .from('usuario')
  .select('*')

console.log('data:', data)
console.log('error:', error)