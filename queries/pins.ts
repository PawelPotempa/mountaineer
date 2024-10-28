import { queryOptions } from '@tanstack/react-query'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/client'

// Server query
export const serverPinOptions = queryOptions({
    queryKey: ['pins'],
    queryFn: async () => {
        const supabase = await createServerClient()
        const { data, error } = await supabase.from('pins').select('*')

        if (error) {
            throw new Error(error.message)
        }

        return data
    },
})

// Client query
export const clientPinOptions = queryOptions({
    queryKey: ['pins'],
    queryFn: async () => {
        const supabase = createClient()
        const { data, error } = await supabase.from('pins').select('*')

        if (error) {
            throw new Error(error.message)
        }

        return data
    },
})

