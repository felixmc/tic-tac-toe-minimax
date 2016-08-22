function draw (board) {
  console.log('\nGAME STATE:\n')
  console.log(`  ${board[0]} | ${board[1]} | ${board[2]}`)
  console.log(' -----------')
  console.log(`  ${board[3]} | ${board[4]} | ${board[5]}`)
  console.log(' -----------')
  console.log(`  ${board[6]} | ${board[7]} | ${board[8]}`)
  console.log('')
}

module.exports = {
  draw,
}
