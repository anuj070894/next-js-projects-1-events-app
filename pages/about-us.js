import Image from "next/image";

export default function Home({ title }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            About Us
        </main>
    );
}

export function getServerSideProps() {
    return {
        props: {
            title: "Hello Everyone"
        }
    };
};