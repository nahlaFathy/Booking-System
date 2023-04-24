import { createServer } from  './src/server';

async function igniteServer() {

    const app = await createServer(); 

    app.listen(process.env.APP_PORT || 8800, () => {
       console.log(`Application started at PORT ${process.env.APP_PORT || 8800}`)
    }).on("error", () => {
        process.exit(1)
    })
}

(async function run() {
    await igniteServer()
})();