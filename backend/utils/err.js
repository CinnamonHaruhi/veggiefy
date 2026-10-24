export const getErrorMessage = (err) => {
    if (err instanceof Error) {
        return err.message;
    }

    if (err && typeof err == "object" && "message" in err) {
        return String(err.message);
    }

    if (typeof err == "string") {
        return err;
    }

    return "An error occurred";
}