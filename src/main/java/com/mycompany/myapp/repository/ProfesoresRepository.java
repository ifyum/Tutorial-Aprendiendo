package com.mycompany.myapp.repository;

    import com.mycompany.myapp.domain.Profesores;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

@Repository
public interface ProfesoresRepository extends JpaRepository<Profesores, Long> {




}
