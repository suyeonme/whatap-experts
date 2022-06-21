import { NotionAPI } from "notion-client"
import { BlockType, ExtendedRecordMap } from "notion-types"

const notion = new NotionAPI()

export const getPage = async (pageId: string) => {
	const recordMap = await notion.getPage(pageId)

	return recordMap
}

/**
 * h1 - header
 * h2 - sub_header
 * h3 - sub_sub_header
 */
export const parseRecordByBlockType = (
	recordMap: ExtendedRecordMap,
	content: string[],
	divideBlock: BlockType
) => {
	const pages = [[]]
	let pageCount = 0

	content?.forEach((blockId) => {
		const block = recordMap.block[blockId]

		// page를 나누려는 type인 경우 pageCount를 늘리고, 해당 Index에 block을 대입
		if (block.value.type === divideBlock) {
			pageCount++
			pages[pageCount] = [].concat(block)
		}

		// 블록에 하위 컨텐츠가 있는 경우, Recursive
		if (!!block?.value?.content) {
			const blocks = parseRecordByBlockType(recordMap, block.value.content, divideBlock)
			pages[pageCount] = pages[pageCount].concat(...blocks)
		} else {
			// 이외의 경우 현재 pageCount에 block 대입
			pages[pageCount].push(block)
		}
	})

	return pages
}

export const getParsedPage = async (
	pageId: string,
	divideBlock: BlockType = "header"
) => {
	const recordMap = await getPage(pageId)
	const page = Object.values(recordMap).find(
		(block) => block.value.type === "page"
	)
	const pageContent = page?.value.content
	const parsedPages = parseRecordByBlockType(
		recordMap,
		pageContent,
		divideBlock
	)
	const pages = parsedPages.map((page, i) => {
		const blocks = page.reduce((acc, block) => {
			const id = block.value.id

			return Object.assign(acc, {
				[id]: block,
			})
		}, {})

		// 임의의 page type 블록의 Content에 나누어진 block들의 id를 담고,
		// block을 page에 담는다.
		return Object.assign(
			{
				[i]: {
					value: {
						id: `page-${i}`,
						type: "page",
						content: Object.keys(blocks),
					},
				},
			},
			blocks
		)
	})

	return {
		pageInfo: page?.value,
		title: page?.value.properties.title[0][0],
		pages,
	}
}
