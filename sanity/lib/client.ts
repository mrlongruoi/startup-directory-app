import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Đặt thành false nếu các trang phát sinh thống kê, sử dụng xác định lại ISR ​​hoặc dựa trên thẻ
})
