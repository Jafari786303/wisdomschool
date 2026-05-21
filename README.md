# Majshan Web Studio

A Firebase web-development order platform for customers, developers, and admins.

## Main Features
- English landing page for customers and developers.
- Registration as `customer` or `developer`; configured admin emails become `admin`.
- Customers create website project requests.
- Developers see only pending open requests, can accept one, then other developers no longer see it.
- Customers see only their own projects.
- Developers see their accepted projects.
- Admin can view users/projects and can also work like a developer.
- Project statuses: `pending`, `accepted`, `done`, `closed`.
- Customer/developer project chat supports text plus uploaded image, video, audio, and document attachments directly in Firestore with a small-file limit.

## Firebase Project
Project configuration is set to `majshanweb-e99cd` in `auth.js` and `dashboard.js`.

Enable these Firebase products:
- Authentication: Email/Password and Google provider.
- Firestore Database: paste `firestore.rules` into Firestore Rules.

## Data Model
- `users/{uid}`: profile and role.
- `projects/{projectId}`: customer website request, accepted developer, status, and chat ID.
- `chats/{chatId}`: project chat metadata and participants.
- `chats/{chatId}/messages/{msgId}`: text messages and optional attachment metadata.
- Chat attachments are saved as small Firestore data URLs inside message documents.

## Run Locally
Serve this folder as static files, for example:

```bash
npx serve /home/deathmaster/Desktop/al-madeena-tajweed-center
```
