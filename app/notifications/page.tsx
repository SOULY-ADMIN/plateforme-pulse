import { getOptionalCurrentUser } from "@/src/lib/auth-runtime";
import { listNotifications } from "@/src/lib/db/designs";

export default async function NotificationsPage() {
  const user = await getOptionalCurrentUser();
  const notifications = await listNotifications(user?.id);
  return (
    <main className="section-tight">
      <div className="container split">
        <div>
          <span className="eyebrow">Notifications</span>
          <h1 className="detail-title">Your studio pulse</h1>
          <p className="hero-copy">Drop deadlines, moderation status, creator verification and voting moments.</p>
        </div>
        <div className="panel notifications-list">
          {notifications.length ? (
            notifications.map((notification) => (
              <article className="notification-card" key={`${notification.type}-${notification.created_at}`}>
                <span>{notification.type}</span>
                <strong>{notification.title}</strong>
                <small>{notification.created_at ? new Date(notification.created_at).toLocaleString() : ""}</small>
              </article>
            ))
          ) : (
            <div className="empty"><div><strong>No notifications yet</strong><p>Real account notifications will appear here after activity starts.</p></div></div>
          )}
        </div>
      </div>
    </main>
  );
}
