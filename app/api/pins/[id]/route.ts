import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PATCH(
    request: Request,
    context: {
        params: Promise<{ id: string }>
    }
) {
    const supabase = await createClient()
    const { details } = await request.json()

    const { id } = await context.params

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error: checkError } = await supabase
        .from('pins')
        .select('*')
        .eq('id', id)
        .single()

    if (checkError) {
        return NextResponse.json({ error: 'Pin not found' }, { status: 404 })
    }

    const { data, error } = await supabase
        .from('pins')
        .update({ details })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
}

export async function DELETE(
    _request: Request,
    context: {
        params: Promise<{ id: string }>
    }
) {
    const supabase = await createClient()

    const { id } = await context.params

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error: checkError } = await supabase
        .from('pins')
        .select('*')
        .eq('id', id)
        .single()

    if (checkError) {
        return NextResponse.json({ error: 'Pin not found' }, { status: 404 })
    }

    const { error } = await supabase
        .from('pins')
        .delete()
        .eq('id', id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
} 