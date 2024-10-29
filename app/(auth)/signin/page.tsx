import type { Metadata } from 'next';
import SignInForm from './signin-form';

export const metadata: Metadata = {
    title: 'Logowanie',
    description: 'Zaloguj się do swojego konta Mountaineer, aby edytować mapę i zapisywać postępy.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function SignInPage() {
    return <SignInForm />;
} 