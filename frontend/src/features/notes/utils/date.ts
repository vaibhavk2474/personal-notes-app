export const formatDate = (
    date: string,
) => {
    // Ex: Jun 20, 2026 8:45 PM
    return new Intl.DateTimeFormat(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short",
        },
    ).format(
        new Date(date),
    );
};