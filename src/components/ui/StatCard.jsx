function StatCard({ title, value, icon, color }) {
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body d-flex justify-content-between align-items-center">

                <div>
                    <h6 className="text-muted">
                        {title}
                    </h6>

                    <h3 className="fw-bold">
                        {value}
                    </h3>
                </div>

                <i
                    className={`bi ${icon} fs-1 text-${color}`}
                ></i>

            </div>
        </div>
    );
}

export default StatCard;