import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

async function test() {
    const payload = { sub: '123', email: 'test@t.com', role: 'Student' };
    const REFRESH_SECRET = 'ssa_refresh_b3d7f2a9e1c6d4b8f0a5e3c7d9b2f6a1';
    
    // Gen 1
    const t1 = jwt.sign({ ...payload, nonce: crypto.randomUUID() }, REFRESH_SECRET, { expiresIn: '7d' });
    console.log("t1:", t1);
    
    // Hash 1
    const h1 = await bcrypt.hash(t1, 10);
    
    // Gen 2
    const t2 = jwt.sign({ ...payload, nonce: crypto.randomUUID() }, REFRESH_SECRET, { expiresIn: '7d' });
    console.log("t2:", t2);
    
    // Hash 2
    const h2 = await bcrypt.hash(t2, 10);
    
    const match = await bcrypt.compare(t1, h2);
    console.log("Does t1 match h2?", match); // should be false
}

test();
