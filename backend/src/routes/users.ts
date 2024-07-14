import { Router } from "express";
import * as Users from "../controllers/users.js";

const router = Router();

router.get("/", async (req, res) => {

    const users = await Users.getUsers();

    res.json(users);

});

router.post("/", async (req, res) => {

    try {

        const { name, surname, email, phone, balance } = req.body;

        if (!name || !surname || !email || !phone || !balance) {
            res.status(400).json({ error: "Invalid body" });
            return
        }

        const user = await Users.createUser({
            name,
            surname,
            email,
            phone,
            balance,
        });

        res.json(user);

    } catch (error: any) {

        res.status(500).json({ error: error.message });

    }

});

router.get("/:id", async (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return
    }

    const user = await Users.getUserById(id);

    res.json(user);

});

router.put("/:id", async (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID" });
        return
    }

    const { name, surname, email, phone, balance } = req.body;

    if (!name || !surname || !email || !phone || !balance) {
        res.status(400).json({ error: "Invalid body" });
        return
    }

    const user = await Users.updateUser(id, {
        name,
        surname,
        email,
        phone,
        balance,
    });

    res.json(user);

});

export default router;
