package com.abinnz.yiyan.common.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface IService<T> {

	List<T> selectAll();

	List<T> selectByExample(Object example);

	T selectByKey(Object key);

	int save(T entity);

	int delete(Object key);

	int batchDelete(List<String> list, String property, Class<T> clazz);

	int updateAll(T entity);

	int updateNotNull(T entity);

}