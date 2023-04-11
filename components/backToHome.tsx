import Link from "next/link";

export default function BackToHome() {
    return (
        <div>
            <Link href="/">
                ← Back to home
            </Link>
        </div>
    );
}
