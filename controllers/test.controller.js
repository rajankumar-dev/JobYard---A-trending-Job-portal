export const testController = (req, res) => {
    const { name } = req.query;
    res.json({ message: `Hello, ${name}! This is the test controller.` });
};
