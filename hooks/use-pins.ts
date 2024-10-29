import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/lib/client';
import { getQueryClient } from '@/lib/get-query-client';
import { Pin, PinType, PinDetails } from '@/types/pins';

export function useCreatePin() {
    const queryClient = getQueryClient();
    const supabase = createClient();

    const mutation = useMutation({
        mutationFn: async ({ x, y, type, details }: { x: number; y: number; type: PinType; details: PinDetails[PinType] }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const response = await fetch('/api/pins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ x, y, type, details, user_id: user.id }),
            });

            if (!response.ok) {
                throw new Error('Failed to create pin');
            }

            return response.json();
        },
        onMutate: async ({ x, y, type, details }) => {
            await queryClient.cancelQueries({ queryKey: ['pins'] });
            const previousPins = queryClient.getQueryData(['pins']);
            const tempId = `temp-${Date.now()}`;

            queryClient.setQueryData(['pins'], (old: Pin[] = []) => [
                ...old,
                { id: tempId, x, y, type, user_id: 'temp', details },
            ]);

            return { previousPins };
        },
        onError: (err, variables, context) => {
            if (context?.previousPins) {
                queryClient.setQueryData(['pins'], context.previousPins);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['pins'] });
        },
    });

    return {
        createPin: mutation.mutate,
        createPinAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}

export function useUpdatePin() {
    const queryClient = getQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ id, details }: { id: string; details: PinDetails[PinType] }) => {
            const response = await fetch(`/api/pins/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ details }),
            });

            if (!response.ok) {
                throw new Error('Failed to update pin');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pins'] });
        },
    });

    return {
        updatePin: mutation.mutate,
        updatePinAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}

export function useDeletePin() {
    const queryClient = getQueryClient();

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/pins/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete pin');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pins'] });
        },
    });

    return {
        deletePin: mutation.mutate,
        deletePinAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
}
