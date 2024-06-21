import {username} from "./constants.js"

let links = [
    { 
        name: 'LinkedIn',
        status: true,
        url: `https://www.linkedin.com/in/${username}/`
    },
    {
        name: 'GitHub',
        status: true,
        url: `https://github.com/${username}`
    },
    {
        name: 'Hackerrank',
        status: true,
        url: `https://www.hackerrank.com/profile/${username}`
    },
    {
        name: 'LeetCode',
        status: true,
        url: `https://leetcode.com/u/${username}/`
    }
]

export default links;