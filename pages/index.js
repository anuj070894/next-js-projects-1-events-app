import Image from "next/image";
import Link from "next/link";

export default function Home({ data }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {
                data && data.map(ev => {
                    return <Link href={`events/${ev.id}`} key={ev.title} passHref>

                        <h2>{ev.title}</h2>
                        <p>{ev.description}</p>
                        <Image src={ev.image} alt={ev.title} width={100} height={100} />

                    </Link>;
                })
            }
        </main>
    );
}

export async function getServerSideProps() {
    const data = await import("../data/data.json");
    return {
        props: {
            data: JSON.parse(JSON.stringify(data.events_categories))
        }
    };
};