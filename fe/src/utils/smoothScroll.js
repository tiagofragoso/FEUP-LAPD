export default (ref) => {
    if (!ref || !ref.current) return;

    ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};
