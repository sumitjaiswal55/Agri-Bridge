const axios = require('axios');
const { faker } = require('@faker-js/faker');

const URL = "http://localhost:5000/auth/signup";
const TOTAL_USERS = 10;

const createFakeUser = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: "Password123",
    phone: faker.string.numeric(10),
    role: faker.helpers.arrayElement(['farmer', 'buyer'])
});

async function startStressTest() {
    console.time("StressTestDuration");
    console.log(`🚀 Starting Stress Test with ${TOTAL_USERS} concurrent requests...`);

    // 100 Users ka data array banaya
    const userPromises = Array.from({ length: TOTAL_USERS }).map(async (_, i) => {
        const userData = createFakeUser();
        try {
            const start = Date.now();
            await axios.post(URL, userData);
            const end = Date.now();
            return { status: 'success', time: end - start };
        } catch (err) {
            return { status: 'failed', error: err.message };
        }
    });

    // Promise.all saari requests ek saath bhejta hai
    const results = await Promise.all(userPromises);

    // Analysis
    const success = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status === 'failed');
    const times = success.map(r => r.time);
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;

    console.log("\n--- Stress Test Report ---");
    console.log(`✅ Success: ${success.length}`);
    console.log(`❌ Failed: ${failed.length}`);
    console.log(`⏱️ Avg Response Time: ${avgTime.toFixed(2)}ms`);
    console.log(`🔥 Max Response Time: ${Math.max(...times)}ms`);
    console.timeEnd("StressTestDuration");
    console.error(err.message);
}

startStressTest();