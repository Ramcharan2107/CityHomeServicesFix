function PageHeader({ title, subtitle }) {
    return (
        <div className="mb-4">
            <h2 className="fw-bold">{title}</h2>
            <p className="text-muted mb-0">
                {subtitle}
            </p>
        </div>
    );
}

export default PageHeader;