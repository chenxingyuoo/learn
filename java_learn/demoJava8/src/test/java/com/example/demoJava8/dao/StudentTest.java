package com.example.demoJava8.dao;

import com.example.demoJava8.bean.Student;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@SpringBootTest //表明这是一个springboot测试类，会自动加载springboot主启动程序
public class StudentTest {

    // 查询全部数据
    @Test
    public void selectAll() throws IOException {
        // 1.加载核心配置文件
        InputStream is = Resources.getResourceAsStream("MyBatisConfig.xml");

        // 2.获取SqlSessionFactory工厂对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        // 3.通过SqlSessionFactory工厂对象获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();

        // 4.执行映射配置文件中的SQL语句，并收取结果
        List<Student> list = sqlSession.selectList("StudentMapper.selectAll");

        // 5.处理结果
        for (Student stu : list) {
            System.out.println(stu);
        }

        // 6.释放资源
        sqlSession.close();
        is.close();
    }
}