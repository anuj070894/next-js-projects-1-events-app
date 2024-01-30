import Image from "next/image";
import Link from "next/link";

export default function Home({ data, pageName }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>Events in {pageName}</h2>
            {data.map(ev => {
                return (
                    <Link href={`/events/${ev.city}/${ev.id}`} key={ev.id} passHref>

                        <div key={ev.id}>
                            <div>{ev.city}</div>
                            <div>Title: {ev.title}</div>
                            <div>Description: {ev.description}</div>

                            <div>{ev.title}</div>
                            <Image src={ev.image} alt={ev.title} height={200} width={200} />
                        </div>

                    </Link>
                );
            })}
        </main >
    );
}

export async function getStaticPaths(context) {
    const data = await import("/data/data.json");
    const allPaths = data.events_categories.map(ev => {
        return {
            params: {
                cat: `${ev.id}`
            }
        }
    });
    return {
        paths: allPaths,
        fallback: true
    };
}

export async function getStaticProps(context) {
    console.log("context2: ", context);
    const data = await import("/data/data.json");
    console.log("data.allEvents: ", data.allEvents);
    const events = data.allEvents.filter(ev => {
        return ev.city === context.params.cat;
    });
    return {
        props: {
            data: events,
            pageName: context.params.cat
        }
    }
};