<template>
    <div class="form full-form auth-cover">
        <div class="form-container">
            <div class="form-form">
                <div class="form-form-wrap">
                    <div class="form-container">
                        <div class="form-content">
                            <h1 class="">
                                Iniciar sesión en <router-link to="/"><span class="brand-name">Mano Amiga</span></router-link>
                            </h1>
                            <p class="signup-link">¿Eres nuevo aquí? <router-link to="/auth/register">Regístrate como voluntario</router-link></p>
                            <Form class="text-start" @submit="handleLogin" :validation-schema="schema">
                                <div class="form">
                                    <div class="field-wrapper input">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-user"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <Field name="username" value="david@creamos.co" type="email" class="form-control" placeholder="Correo electrónico"/>
                                        <ErrorMessage name="username" class="error-feedback text-danger" />
                                    </div>

                                    <div class="field-wrapper input mb-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-lock"
                                        >
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <Field name="password" value="password" type="password" class="form-control" placeholder="Contraseña"/>
                                        <ErrorMessage name="password" class="error-feedback text-danger" />
                                    </div>
                                    <div class="d-sm-flex justify-content-between">
                                        <div class="field-wrapper toggle-pass d-flex align-items-center">
                                            <p class="d-inline-block">Ver contraseña</p>
                                            <label class="switch s-primary mx-2">
                                                <input type="checkbox" class="custom-control-input" checked="" />
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="field-wrapper">
                                            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                                        </div>
                                    </div>

                                    <div v-if="message" class="field-wrapper text-center keep-logged-in">
                                        <div class="form-group">
                                            <div class="alert alert-danger" role="alert">
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="field-wrapper text-center keep-logged-in">
                                        <div class="checkbox-outline-primary custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" value="true" id="chkRemember" />
                                            <label class="custom-control-label" for="chkRemember">Mantener mi sesión activa</label>
                                        </div>
                                    </div>

                                    <div class="field-wrapper">
                                        <router-link to="/auth/pass-recovery" class="forgot-pass-link">¿Olvidaste tu contraseña?</router-link>
                                    </div>
                                </div>
                            </Form>
                            <p class="terms-conditions text-center">
                                © 2023 Todos los derechos reservados. <router-link to="/">Mano Amiga</router-link> es un producto de Iyata LLC.
                                <br>
                                <a href="javascript:void(0);">Políticas de privacidad</a>, y <a href="javascript:void(0);">Términos & condiciones</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-image">
                <div class="l-image"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: "Login",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            username: yup.string().required("¡El correo electrónico es requerido!"),
            password: yup.string().required("¡La contraseña es requerida!"),
        });

        return {
            loading: false,
            message: "",
            schema,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        handleLogin(user) {
            this.$store.dispatch("auth/login", user)
            .then( () => {
                this.$router.push("/");
            }, (error) => {
                this.loading = false;
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                }
            );
        },
    },
};
</script>

<script setup>
    import "../../assets/sass/authentication/auth.scss";
    import * as yup from "yup";

    import { useMeta } from "../../composables/use-meta";
    useMeta({ title: "Iniciar sesión" });
</script>
