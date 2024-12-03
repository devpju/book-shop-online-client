import baseQueryWithReauth from '@/config/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getFullCategories: builder.query({
      query: () => ({
        url: '/admin/categories'
      }),
      providesTags: ['Categories']
    }),
    createNewCategory: builder.mutation({
      query: ({ name }) => ({
        url: '/admin/categories',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['Categories']
    })
  })
});

export const { useGetFullCategoriesQuery, useCreateNewCategoryMutation } = categoriesApi;
