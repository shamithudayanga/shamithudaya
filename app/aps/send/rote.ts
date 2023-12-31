import App from "next/app";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        const transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",
            port: 465,
            secure: true,
            auth: {
                user: "udayangaa273@gmail.com",
                pass: process.env.NEXT_PUBLIC_PASSWORD,
            },
        });

        const mailOption = {
            from: email,
            to: 'udayangaa273@gmail.com',
            subject: "Request Message",
            html: `
        <h3> Hello ${name}</h3>
        <li> email: ${email}</li>
        <li> message: ${message}</li>
        `

        }

        await transporter.sendMail(mailOption)
        return NextResponse.json({ message: "Email Sent Successful" },
            { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Email Sent Unsuccessful" },
            { status: 500 })


    }

}