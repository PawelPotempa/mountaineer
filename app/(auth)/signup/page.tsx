import type { Metadata } from 'next';
import SignUpForm from './signup-form';

export const metadata: Metadata = {
    title: 'Rejestracja',
    description: 'Utwórz konto w Mountaineer, aby edytować mapę i zapisywać postępy.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function SignUpPage() {
    return <SignUpForm />;
} 