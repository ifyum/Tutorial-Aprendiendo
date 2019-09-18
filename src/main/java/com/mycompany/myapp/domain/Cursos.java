package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "Cursos")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cursos implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sala")
    private Long Sala;

    @JoinColumn(name = "profesor_jefe_id", nullable = false)
    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Profesores profesorJefe;

    @Column(name = "cantidad_alumnos")
    private Integer cantidadAlumnos;

    @Column(name = "letra")
    private String letra;


    @Column(name = "Curso")
    private String Curso;

    public Cursos() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSala() {
        return Sala;
    }

    public void setSala(Long sala) {
        this.Sala = sala;
    }

    public Profesores getProfesorJefe() {
        return profesorJefe;
    }

    public void setProfesorJefe(Profesores profesorJefe) {
        this.profesorJefe = profesorJefe;
    }

    public Integer getCantidadAlumnos() {
        return cantidadAlumnos;
    }

    public void setCantidadAlumnos(Integer cantidadAlumnos) {
        this.cantidadAlumnos = cantidadAlumnos;
    }

    public String getLetra() {
        return letra;
    }

    public void setLetra(String letra) {
        this.letra = letra;
    }

    public String getCurso() {
        return Curso;
    }

    public void setCurso(String curso) {
        this.Curso = curso;
    }

    @Override
    public String toString() {
        return "Cursos{" +
                "id=" + id +
                ", Sala=" + Sala +
                ", profesor=" + profesorJefe +
                ", cantidadAlumnos=" + cantidadAlumnos +
                ", letra=" + letra +
                ", Curso=" + Curso +
                '}';
    }
}
