import {createClient} from '@supabase/supabase-js';
import {config} from '../config/index.js';
import WebSocket from 'ws';

global.WebSocket= WebSocket;

const supabase = createClient(
    config.supabaseUrl,
    config.supabasekey
)

export{supabase};