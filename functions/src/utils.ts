import * as crypto from "crypto";

const config = {
    "pepper": "LMSakiZr9jmK2jYf65vOwEw9ujviGqQP"
}

export const hashPassword = (password: string, salt?: string) => {
    if (!salt) {
        salt = crypto.randomBytes(16).toString("hex");
    }

    const pepper = config.pepper;
    const p = password + "";
    const hash = crypto.pbkdf2Sync(p, salt + pepper, 1000, 64, "sha512").toString("hex");

    return { hash, salt };
}