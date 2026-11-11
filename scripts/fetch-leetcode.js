const fs = require('fs');
const path = require('path');

function getLeetCodeUsername() {
  try {
    const siteConfig = fs.readFileSync(path.join(__dirname, '..', 'src', 'config', 'site.ts'), 'utf8');
    const match = siteConfig.match(/leetcode:\s*\{[\s\S]*?username:\s*["']([^"']+)["']/);
    if (match && match[1]) return match[1];
  } catch {}
  return 'vishvjeet1623';
}

async function fetchLeetCodeStats() {
  const username = getLeetCodeUsername();
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      process.exit(1);
    }

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    
    const formattedData = {
      solvedProblem: stats.find(s => s.difficulty === 'All')?.count || 0,
      easySolved: stats.find(s => s.difficulty === 'Easy')?.count || 0,
      mediumSolved: stats.find(s => s.difficulty === 'Medium')?.count || 0,
      hardSolved: stats.find(s => s.difficulty === 'Hard')?.count || 0,
    };

    const dir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(dir, 'leetcode.json'),
      JSON.stringify(formattedData, null, 2)
    );

    console.log('Successfully fetched and saved LeetCode stats:', formattedData.solvedProblem, 'problems solved.');
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    process.exit(1);
  }
}

fetchLeetCodeStats();
