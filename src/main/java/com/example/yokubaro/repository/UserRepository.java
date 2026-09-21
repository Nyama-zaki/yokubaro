package com.example.yokubaro.repository;

import com.example.yokubaro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLoginId(String loginId);
}
//この継承でSpring Bootが用意してくれているJpaRepositoryを継承することによって
// 「保存する(save)」「全件検索する(findAll)」「IDで探す(findById)」といった基本のデータベース操作機能が、まるごと全部自動で使える

