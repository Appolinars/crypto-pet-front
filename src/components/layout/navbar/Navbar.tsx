import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import Avatar from '@/components/ui/avatar/Avatar';
import Burger from '@/components/ui/burger/Burger';

import { logout } from '@/redux/auth/authActions';

import { useAppDispatch } from '@/hooks/redux';
import { useAuth } from '@/hooks/useAuth';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

import CreateNoteIcon from '@/svg/create-note.svg';
import DashboardIcon from '@/svg/dashboard.svg';
import ExploreIcon from '@/svg/explore.svg';
import HomeIcon from '@/svg/home.svg';
import LoginIcon from '@/svg/login.svg';
import LogoIcon from '@/svg/logo.svg';
import LogoutIcon from '@/svg/logout.svg';
import RegistrationIcon from '@/svg/registration.svg';
import SettingsIcon from '@/svg/settings.svg';
import StatisticIcon from '@/svg/statistic.svg';

import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const [burgerActive, setBurgerActive] = useState<boolean>(false);

  const user = useAuth();
  const dispatch = useAppDispatch();
  const { asPath } = useRouter();

  useBodyScrollLock(burgerActive);

  const toggleBurgerMenu = () => {
    setBurgerActive((prev) => !prev);
  };

  useEffect(() => {
    if (burgerActive) setBurgerActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  const handleLogout = () => {
    dispatch(logout());
    if (burgerActive) setBurgerActive(false);
  };

  return (
    <div
      className={clsx(
        'flex justify-between items-center p-3 xl:flex-col xl:justify-start xl:items-stretch xl:p-6 xl:border-r-2 border-gray-700',
        styles.nav_wrapper
      )}
    >
      {user ? (
        <Avatar user={user} className="max-w-[44px] xl:max-w-none xl:mx-auto xl:mb-4" />
      ) : (
        <Link href="/">
          <a className="inline-block xl:mb-4">
            <LogoIcon />
          </a>
        </Link>
      )}
      <Burger burgerActive={burgerActive} toggleBurgerMenu={toggleBurgerMenu} />
      <nav
        className={clsx(styles.nav, { [styles.nav_active]: burgerActive })}
        onClick={toggleBurgerMenu}
      >
        <ul className={styles.nav__list} onClick={(e) => e.stopPropagation()}>
          <li className={styles.nav__item}>
            <Link href="/">
              <a className={styles.nav__link}>
                <HomeIcon /> Home
              </a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/explore">
              <a className={styles.nav__link}>
                <ExploreIcon /> Explore
              </a>
            </Link>
          </li>
          {user ? (
            <>
              <li className={`${styles.nav__item} border-t-2 border-gray-700 pt-4`}>
                <Link href="/dashboard">
                  <a className={styles.nav__link}>
                    <DashboardIcon /> Dashboard
                  </a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/create-note">
                  <a className={styles.nav__link}>
                    <CreateNoteIcon /> Create note
                  </a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/statistic">
                  <a className={styles.nav__link}>
                    <StatisticIcon /> My statistic
                  </a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/settings">
                  <a className={styles.nav__link}>
                    <SettingsIcon /> Settings
                  </a>
                </Link>
              </li>
              <li className={`${styles.nav__item} border-t-2 border-gray-700 pt-4`}>
                <button className={styles.nav__link} onClick={handleLogout}>
                  <LogoutIcon /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={`${styles.nav__item} border-t-2 border-gray-700 pt-4`}>
                <Link href="/login">
                  <a className={styles.nav__link}>
                    <LoginIcon /> Login
                  </a>
                </Link>
              </li>
              <li className={styles.nav__item}>
                <Link href="/registration">
                  <a className={styles.nav__link}>
                    <RegistrationIcon /> Registration
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
