import path from 'path';
import fs from 'fs';

const buildPath = () => {
    return path.join(process.cwd(), 'data', 'data.json');
};

const extractData = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath));
};

export default function handler(req, res) {
    const { method } = req;

    const filePath = buildPath();

    const { events_categories, allEvents } = extractData(filePath);

    if (!allEvents) {
        res.status(404).json({
            message: "No events found"
        });
        return;
    }

    if (method === 'POST') {
        const { email, eventId } = req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({
                name: "Invalid email address",
            });
            return;
        }
        const newAllEvents = allEvents.map(ev => {
            if (ev.id === eventId) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({
                        message: "Email already registered"
                    });
                    return;
                }

                return {
                    ...ev,
                    emails_registered: [...ev.emails_registered, email]
                };
            }
            return ev;
        });

        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

        res.status(200).json({
            name: `Successfully registered with the email: ${email}`
        });
    }
}