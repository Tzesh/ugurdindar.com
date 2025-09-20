import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';
import { username } from '../constants/constants';

const GithubPage = ({ repos, user }) => {
  const theme = {
    dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    maxLevel: 4
  };

  return (
    <>
      <div className={styles.user}>
        <div>
          <Image
            src={user.avatar_url}
            className={styles.avatar}
            alt={user.login}
            width={50}
            height={50}
          />
          <h3 className={styles.username}>{user.login}</h3>
        </div>
        <div>
          <h3>{user.public_repos} repos</h3>
        </div>
        <div>
          <h3>{user.followers} followers</h3>
        </div>
      </div>
      <div className={styles.container}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className={styles.contributions}>
        <GitHubCalendar
          username={username}
          theme={theme}
          hideColorLegend
          hideMonthLabels
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const userRes = await fetch(
    `https://api.github.com/users/${username}`
  );
  const user = await userRes.json();

  const repoRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );
  let repos = await repoRes.json();
  if (!Array.isArray(repos)) {
    repos = [];
  }

  repos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return {
    props: { title: 'GitHub', repos, user },
    revalidate: 10,
  };
}

export default GithubPage;
