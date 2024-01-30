import Image from "next/image";
import Link from "next/link";

export default function Home({ data }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {data.map(ev => {
                return (
                    <Link key={ev.id} href={`/events/${ev.id}`} passHref>

                        <div >
                            <div>{ev.title}</div>
                            <Image src={ev.image} alt={ev.title} height={200} width={200} />
                        </div>

                    </Link>
                );
            })}
        </main>
    );
}

export async function getServerSideProps() {
    const data = await import("../../data/data.json");
    return {
        props: {
            data: JSON.parse(JSON.stringify(data.events_categories))
        }
    };
};