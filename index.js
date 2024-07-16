
const { getLastChapterSummary } = require('./src/services/potterApi');


async function main() {
  try {
    const summary = await getLastChapterSummary();
    console.info('Summary of the last chapter:', summary);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

main();
