import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function Home({ data }) {
    const inputRef = useRef();
    const router = useRouter();
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const emailVal = inputRef.current.value;
        const eventId = router.query.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (!String(emailVal).match(validRegex)) {
            setMessage("Please enter a valid email");
            return;
        }

        try {
            const response = await fetch('/api/hello', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailVal, eventId: eventId })
            });

            if (!response.ok) {
                throw new Error("Failed to submit email");
            }

            const respMessage = await response.json();
            console.log(respMessage);
            setMessage(respMessage.name);
            inputRef.current.value = "";
        } catch (err) {
            console.log('Error: ', err);
        }

    };

    console.log(data);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>Title: {data.title}</div>
            <div>Description: {data.description}</div>
            <Image src={data.image} alt={data.title} height={300} width={400} />
            <form onSubmit={onSubmit}>
                <label>Get registered for this event</label>
                <input ref={inputRef} type="email" id="email" placeholder="Please enter your email address" />
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </main>
    );
}

export async function getStaticPaths(context) {
    const data = await import("/data/data.json");
    console.log(data.allEvents);
    const allPaths = data.allEvents.map(ev => {
        return {
            params: {
                id: ev.id,
                cat: ev.city
            }
        }
    });

    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const data = await import("/data/data.json");
    const eventData = data.allEvents.find((ev) => {
        return ev.id === context.params.id
    });
    return {
        props: {
            data: eventData
        }
    };
} 