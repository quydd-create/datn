from fastapi_mail import FastMail, MessageSchema
from typing import List
from app.core.mail_setting import get_mail_conf


async def send_simple_email(subject: str, recipients: List[str], body: str):
    message = MessageSchema(
        subject=subject, recipients=recipients, body=body, subtype="html"
    )
    fm = FastMail(get_mail_conf())
    await fm.send_message(message)
