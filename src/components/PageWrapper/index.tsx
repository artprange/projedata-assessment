import { Link, NavLink } from 'react-router-dom';

import type { PageWrapperProps } from './types';
import { styles } from './styles';
import { cn } from '../../lib/cs';

function getNavClassName(isActive: boolean) {
	return cn(
		styles.navLink.base,
		isActive ? styles.navLink.active : styles.navLink.inactive,
	);
}

function PageWrapper({ title, subtitle, actions, children }: PageWrapperProps) {
	return (
		<div className={styles.shell}>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className="flex items-start justify-between gap-4">
						<div>
							<Link
								to="/"
								className="text-xs text-gray-500 hover:underline"
							>
								Inventory System
							</Link>

							<h1 className={styles.title}>{title}</h1>

							{subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
						</div>

						{actions ? <div className="flex gap-2">{actions}</div> : null}
					</div>

					<nav className={styles.nav}>
						<NavLink
							to="/"
							className={({ isActive }) => getNavClassName(isActive)}
						>
							Plan
						</NavLink>

						<NavLink
							to="/products"
							className={({ isActive }) => getNavClassName(isActive)}
						>
							Products
						</NavLink>

						<NavLink
							to="/materials"
							className={({ isActive }) => getNavClassName(isActive)}
						>
							Materials
						</NavLink>
					</nav>
				</header>

				<main>{children}</main>
			</div>
		</div>
	);
}

export default PageWrapper;
