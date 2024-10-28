import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient()
    const { details } = await request.json()
    const id = await Promise.resolve(params.id)

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: existingPin, error: checkError } = await supabase
        .from('pins')
        .select('*')
        .eq('id', id)
        .single()

    if (checkError) {
        return NextResponse.json({ error: 'Pin not found' }, { status: 404 })
    }

    if (existingPin.user_id !== user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
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
    request: Request,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient()
    const id = await Promise.resolve(params.id)

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: existingPin, error: checkError } = await supabase
        .from('pins')
        .select('*')
        .eq('id', id)
        .single()

    if (checkError) {
        return NextResponse.json({ error: 'Pin not found' }, { status: 404 })
    }

    if (existingPin.user_id !== user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
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