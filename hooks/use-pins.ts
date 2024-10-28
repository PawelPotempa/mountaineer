import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/lib/client';
import { getQueryClient } from '@/lib/get-query-client';
import { Pin } from '@/types/pins';

export function useCreatePin() {
    const queryClient = getQueryClient();
    const supabase = createClient();

    return useMutation({
        mutationFn: async ({ x, y }: { x: number; y: number }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const response = await fetch('/api/pins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ x, y, user_id: user.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to create pin');
            }

            return response.json();
        },
        onMutate: async ({ x, y }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['pins'] });

            // Snapshot the previous value
            const previousPins = queryClient.getQueryData(['pins']);

            // Create a temporary ID for the optimistic pin
            const tempId = `temp-${Date.now()}`;

            // Optimistically update the pins list
            queryClient.setQueryData(['pins'], (old: Pin[] = []) => [
                ...old,
                { id: tempId, x, y, user_id: 'temp' },
            ]);

            // Return the snapshot
            return { previousPins };
        },
        onError: (err, variables, context) => {
            // Revert back to the previous state if there's an error
            if (context?.previousPins) {
                queryClient.setQueryData(['pins'], context.previousPins);
            }
        },
        onSettled: () => {
            // Always refetch after error or success to ensure we're in sync
            queryClient.invalidateQueries({ queryKey: ['pins'] });
        },
    });
}
