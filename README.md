Hello, I basically decided to start the project by focusing on the logic side of it. First, I decided to "normalize" the data from the JSON, similarly to how we normally handle data coming from APIs, so that it could be used in the table component.

Once all the data was correctly displayed in the table format, I started working on the filters. It took me some time to realize all the conditions and fit them into a relatively simple function.

This step was actually incremental, as every time I realized something about what could be improved, I updated the function.

After the filters were working properly, I decided to start working a bit on the design of the page, which was completely untouched. I didn’t spend too much time here, to be honest, because there are countless ways to approach design, and you can easily spend a lot of time on it. My focus was just on having something that worked as expected with a simple, clean design that wasn’t grotesque.

After all of that, I started creating unit tests for my page (the only one) and also for the components I created. Honestly, the tests could, of course, be expanded, but I believe the ideal scenario for unit testing is to work incrementally so we can have a clear understanding of what’s happening, rather than just creating a ton of tests and never revisiting them.

I would say the entire process took me about 5-6 hours to complete.

Thank you very much for the opportunity, and I hope we can discuss this further!

Sincerely,
Hyorran

----------------------------------------------------------------------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
